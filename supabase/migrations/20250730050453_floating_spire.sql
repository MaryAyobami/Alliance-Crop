/*
  # Complete Database Schema for Alliance CropCraft

  1. New Tables
    - `profiles` - User profiles linked to auth.users with role management
    - `tasks` - Task management system with assignments and completion tracking
    - `livestock` - Livestock inventory and health tracking
    - `pastures` - Pasture management and rotation tracking
    - `health_records` - Veterinary health records for livestock
    - `task_evidence` - Photo evidence and files for completed tasks
    - `notifications` - System notifications for users

  2. Security
    - Enable RLS on all tables
    - Role-based access policies (admin, farmer-attendant, pasture-manager, veterinary-doctor)
    - Users can only access their own data unless they're admin
    - Proper foreign key relationships and constraints

  3. Features
    - Task assignment and completion tracking
    - Livestock health monitoring
    - Pasture rotation management
    - File upload support for task evidence
    - Notification system
    - Comprehensive audit trails
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'farmer-attendant', 'pasture-manager', 'veterinary-doctor');
CREATE TYPE task_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE livestock_status AS ENUM ('healthy', 'sick', 'quarantine', 'deceased');
CREATE TYPE pasture_status AS ENUM ('active', 'resting', 'maintenance');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  role user_role NOT NULL DEFAULT 'farmer-attendant',
  avatar_url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Livestock table
CREATE TABLE IF NOT EXISTS livestock (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_number text UNIQUE NOT NULL,
  category text NOT NULL, -- 'Dairy Cows', 'Beef Cattle', 'Sheep', 'Goats'
  breed text,
  birth_date date,
  gender text CHECK (gender IN ('male', 'female')),
  weight decimal(8,2),
  status livestock_status DEFAULT 'healthy',
  current_pasture_id uuid,
  assigned_to uuid REFERENCES profiles(id),
  notes text,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pastures table
CREATE TABLE IF NOT EXISTS pastures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  section text NOT NULL, -- 'A', 'B', 'C', etc.
  area_hectares decimal(10,2),
  capacity integer DEFAULT 0,
  current_livestock_count integer DEFAULT 0,
  status pasture_status DEFAULT 'active',
  last_rotation_date date,
  next_rotation_date date,
  manager_id uuid REFERENCES profiles(id),
  notes text,
  created_by uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key for livestock current_pasture_id
ALTER TABLE livestock ADD CONSTRAINT fk_livestock_pasture 
  FOREIGN KEY (current_pasture_id) REFERENCES pastures(id);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  priority task_priority DEFAULT 'medium',
  status task_status DEFAULT 'pending',
  scheduled_date date NOT NULL,
  scheduled_time time,
  estimated_duration interval,
  assigned_to uuid REFERENCES profiles(id),
  created_by uuid REFERENCES profiles(id) NOT NULL,
  livestock_id uuid REFERENCES livestock(id),
  pasture_id uuid REFERENCES pastures(id),
  completed_at timestamptz,
  completed_by uuid REFERENCES profiles(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health records table
CREATE TABLE IF NOT EXISTS health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  livestock_id uuid REFERENCES livestock(id) NOT NULL,
  examination_date date NOT NULL,
  examination_time time DEFAULT CURRENT_TIME,
  veterinarian_id uuid REFERENCES profiles(id) NOT NULL,
  temperature decimal(4,1),
  weight decimal(8,2),
  condition_assessment text,
  symptoms text,
  diagnosis text,
  treatment text,
  medications text,
  follow_up_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Task evidence table (for photo uploads and documentation)
CREATE TABLE IF NOT EXISTS task_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL, -- 'image', 'document', 'video'
  file_size bigint,
  uploaded_by uuid REFERENCES profiles(id) NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  read boolean DEFAULT false,
  action_url text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_livestock_status ON livestock(status);
CREATE INDEX IF NOT EXISTS idx_livestock_assigned_to ON livestock(assigned_to);
CREATE INDEX IF NOT EXISTS idx_livestock_current_pasture ON livestock(current_pasture_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_scheduled_date ON tasks(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_health_records_livestock ON health_records(livestock_id);
CREATE INDEX IF NOT EXISTS idx_health_records_veterinarian ON health_records(veterinarian_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestock ENABLE ROW LEVEL SECURITY;
ALTER TABLE pastures ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Livestock policies
CREATE POLICY "Users can read livestock they manage or all if admin"
  ON livestock FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update livestock they manage or all if admin"
  ON livestock FOR UPDATE
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can insert livestock"
  ON livestock FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Pastures policies
CREATE POLICY "Users can read pastures they manage or all if admin/pasture-manager"
  ON pastures FOR SELECT
  TO authenticated
  USING (
    manager_id = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pasture-manager')
    )
  );

CREATE POLICY "Pasture managers and admins can update pastures"
  ON pastures FOR UPDATE
  TO authenticated
  USING (
    manager_id = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pasture-manager')
    )
  );

CREATE POLICY "Pasture managers and admins can insert pastures"
  ON pastures FOR INSERT
  TO authenticated
  WITH CHECK (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'pasture-manager')
    )
  );

-- Tasks policies
CREATE POLICY "Users can read tasks assigned to them or created by them or all if admin"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update tasks assigned to them or created by them or all if admin"
  ON tasks FOR UPDATE
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can insert tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Health records policies
CREATE POLICY "Veterinarians can read all health records, others can read records for livestock they manage"
  ON health_records FOR SELECT
  TO authenticated
  USING (
    veterinarian_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'veterinary-doctor')
    ) OR
    EXISTS (
      SELECT 1 FROM livestock 
      WHERE id = health_records.livestock_id AND assigned_to = auth.uid()
    )
  );

CREATE POLICY "Veterinarians and admins can insert health records"
  ON health_records FOR INSERT
  TO authenticated
  WITH CHECK (
    veterinarian_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'veterinary-doctor')
    )
  );

CREATE POLICY "Veterinarians can update their own health records"
  ON health_records FOR UPDATE
  TO authenticated
  USING (
    veterinarian_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Task evidence policies
CREATE POLICY "Users can read evidence for tasks they're involved with"
  ON task_evidence FOR SELECT
  TO authenticated
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM tasks 
      WHERE id = task_evidence.task_id AND (assigned_to = auth.uid() OR created_by = auth.uid())
    ) OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can upload evidence for their tasks"
  ON task_evidence FOR INSERT
  TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM tasks 
      WHERE id = task_evidence.task_id AND (assigned_to = auth.uid() OR created_by = auth.uid())
    )
  );

-- Notifications policies
CREATE POLICY "Users can read their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "Authenticated users can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_livestock_updated_at BEFORE UPDATE ON livestock
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pastures_updated_at BEFORE UPDATE ON pastures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at BEFORE UPDATE ON health_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'farmer-attendant')
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update last_login on profile
CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS trigger AS $$
BEGIN
  UPDATE public.profiles 
  SET last_login = now()
  WHERE id = new.id;
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to update last_login
CREATE OR REPLACE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.update_last_login();
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      health_records: {
        Row: {
          condition_assessment: string | null
          created_at: string
          diagnosis: string | null
          examination_date: string
          examination_time: string | null
          follow_up_date: string | null
          id: string
          livestock_id: string
          medications: string | null
          notes: string | null
          symptoms: string | null
          temperature: number | null
          treatment: string | null
          updated_at: string
          veterinarian_id: string
          weight: number | null
        }
        Insert: {
          condition_assessment?: string | null
          created_at?: string
          diagnosis?: string | null
          examination_date: string
          examination_time?: string | null
          follow_up_date?: string | null
          id?: string
          livestock_id: string
          medications?: string | null
          notes?: string | null
          symptoms?: string | null
          temperature?: number | null
          treatment?: string | null
          updated_at?: string
          veterinarian_id: string
          weight?: number | null
        }
        Update: {
          condition_assessment?: string | null
          created_at?: string
          diagnosis?: string | null
          examination_date?: string
          examination_time?: string | null
          follow_up_date?: string | null
          id?: string
          livestock_id?: string
          medications?: string | null
          notes?: string | null
          symptoms?: string | null
          temperature?: number | null
          treatment?: string | null
          updated_at?: string
          veterinarian_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "health_records_livestock_id_fkey"
            columns: ["livestock_id"]
            isOneToOne: false
            referencedRelation: "livestock"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_records_veterinarian_id_fkey"
            columns: ["veterinarian_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      livestock: {
        Row: {
          assigned_to: string | null
          birth_date: string | null
          breed: string | null
          category: string
          created_at: string
          created_by: string
          current_pasture_id: string | null
          gender: string | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["livestock_status"]
          tag_number: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          assigned_to?: string | null
          birth_date?: string | null
          breed?: string | null
          category: string
          created_at?: string
          created_by: string
          current_pasture_id?: string | null
          gender?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["livestock_status"]
          tag_number: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          assigned_to?: string | null
          birth_date?: string | null
          breed?: string | null
          category?: string
          created_at?: string
          created_by?: string
          current_pasture_id?: string | null
          gender?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["livestock_status"]
          tag_number?: string
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_livestock_pasture"
            columns: ["current_pasture_id"]
            isOneToOne: false
            referencedRelation: "pastures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livestock_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livestock_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          created_by: string | null
          id: string
          message: string
          read: boolean
          recipient_id: string
          title: string
          type: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          message: string
          read?: boolean
          recipient_id: string
          title: string
          type?: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          message?: string
          read?: boolean
          recipient_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pastures: {
        Row: {
          area_hectares: number | null
          capacity: number
          created_at: string
          created_by: string
          current_livestock_count: number
          id: string
          last_rotation_date: string | null
          manager_id: string | null
          name: string
          next_rotation_date: string | null
          notes: string | null
          section: string
          status: Database["public"]["Enums"]["pasture_status"]
          updated_at: string
        }
        Insert: {
          area_hectares?: number | null
          capacity?: number
          created_at?: string
          created_by: string
          current_livestock_count?: number
          id?: string
          last_rotation_date?: string | null
          manager_id?: string | null
          name: string
          next_rotation_date?: string | null
          notes?: string | null
          section: string
          status?: Database["public"]["Enums"]["pasture_status"]
          updated_at?: string
        }
        Update: {
          area_hectares?: number | null
          capacity?: number
          created_at?: string
          created_by?: string
          current_livestock_count?: number
          id?: string
          last_rotation_date?: string | null
          manager_id?: string | null
          name?: string
          next_rotation_date?: string | null
          notes?: string | null
          section?: string
          status?: Database["public"]["Enums"]["pasture_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pastures_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pastures_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          last_login: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id: string
          last_login?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          last_login?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      task_evidence: {
        Row: {
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          task_id: string
          uploaded_at: string
          uploaded_by: string
        }
        Insert: {
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          task_id: string
          uploaded_at?: string
          uploaded_by: string
        }
        Update: {
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          task_id?: string
          uploaded_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_evidence_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_evidence_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          completed_by: string | null
          created_at: string
          created_by: string
          description: string | null
          estimated_duration: unknown | null
          id: string
          livestock_id: string | null
          notes: string | null
          pasture_id: string | null
          priority: Database["public"]["Enums"]["task_priority"]
          scheduled_date: string
          scheduled_time: string | null
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          estimated_duration?: unknown | null
          id?: string
          livestock_id?: string | null
          notes?: string | null
          pasture_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          scheduled_date: string
          scheduled_time?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          estimated_duration?: unknown | null
          id?: string
          livestock_id?: string | null
          notes?: string | null
          pasture_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          scheduled_date?: string
          scheduled_time?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_completed_by_fkey"
            columns: ["completed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_livestock_id_fkey"
            columns: ["livestock_id"]
            isOneToOne: false
            referencedRelation: "livestock"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_pasture_id_fkey"
            columns: ["pasture_id"]
            isOneToOne: false
            referencedRelation: "pastures"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      livestock_status: "healthy" | "sick" | "quarantine" | "deceased"
      pasture_status: "active" | "resting" | "maintenance"
      task_priority: "high" | "medium" | "low"
      task_status: "pending" | "in_progress" | "completed" | "cancelled"
      user_role: "admin" | "farmer-attendant" | "pasture-manager" | "veterinary-doctor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
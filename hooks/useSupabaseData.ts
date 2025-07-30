import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type Tables = Database['public']['Tables']

// Generic hook for fetching data with RLS automatically applied
export function useSupabaseQuery<T extends keyof Tables>(
  table: T,
  options?: {
    select?: string
    filter?: Record<string, any>
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let query = supabase.from(table).select(options?.select || '*')

        // Apply filters
        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        // Apply ordering
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending ?? true 
          })
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit)
        }

        const { data: result, error } = await query

        if (error) throw error
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, JSON.stringify(options)])

  return { data, loading, error, refetch: () => setLoading(true) }
}

// Specific hooks for common queries
export function useTasks(userId?: string) {
  return useSupabaseQuery('tasks', {
    select: `
      *,
      assigned_to_profile:profiles!tasks_assigned_to_fkey(full_name),
      created_by_profile:profiles!tasks_created_by_fkey(full_name),
      livestock(tag_number, category),
      pastures(name, section)
    `,
    filter: userId ? { assigned_to: userId } : undefined,
    orderBy: { column: 'scheduled_date', ascending: true }
  })
}

export function useLivestock() {
  return useSupabaseQuery('livestock', {
    select: `
      *,
      assigned_to_profile:profiles!livestock_assigned_to_fkey(full_name),
      current_pasture:pastures(name, section)
    `,
    orderBy: { column: 'tag_number', ascending: true }
  })
}

export function usePastures() {
  return useSupabaseQuery('pastures', {
    select: `
      *,
      manager:profiles!pastures_manager_id_fkey(full_name)
    `,
    orderBy: { column: 'section', ascending: true }
  })
}

export function useHealthRecords(livestockId?: string) {
  return useSupabaseQuery('health_records', {
    select: `
      *,
      livestock(tag_number, category),
      veterinarian:profiles!health_records_veterinarian_id_fkey(full_name)
    `,
    filter: livestockId ? { livestock_id: livestockId } : undefined,
    orderBy: { column: 'examination_date', ascending: false }
  })
}

export function useNotifications() {
  return useSupabaseQuery('notifications', {
    orderBy: { column: 'created_at', ascending: false }
  })
}

// Hook for creating/updating data
export function useSupabaseMutation<T extends keyof Tables>(table: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const insert = async (data: Tables[T]['Insert']) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single()

      if (error) throw error
      return { data: result, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: Tables[T]['Update']) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data: result, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return { insert, update, remove, loading, error }
}
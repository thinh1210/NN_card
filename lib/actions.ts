'use server'

import { supabase } from '@/lib/supabase'
import { generateSlug } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function createInvite(name: string) {
  if (!name || name.trim() === '') {
    return { error: 'Tên không được để trống' }
  }

  const slug = generateSlug(name)
  let finalSlug = slug
  let counter = 1

  while (true) {
    const { data: existing } = await supabase
      .from('invitations')
      .select('id')
      .eq('slug', finalSlug)
      .maybeSingle()

    if (!existing) {
      break
    }
    finalSlug = `${slug}-${counter}`
    counter++
  }

  const { data, error } = await supabase
    .from('invitations')
    .insert([{ guest_name: name, slug: finalSlug }])
    .select()
    .single()

  if (error) {
    console.error('Error creating invite:', error)
    return { error: 'Lỗi khi tạo thư mời' }
  }

  revalidatePath('/admin')
  return { success: true, data }
}

export async function deleteInvite(id: string) {
  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting invite:', error)
    return { error: 'Lỗi khi xoá thư mời' }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function getInvites() {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching invites:', error)
    return []
  }

  return data
}

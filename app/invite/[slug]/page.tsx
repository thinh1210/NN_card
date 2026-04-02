import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import InviteCard from './InviteCard'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const { data } = await supabase
    .from('invitations')
    .select('guest_name')
    .eq('slug', resolvedParams.slug)
    .maybeSingle()

  if (!data) {
    return {
      title: 'Không tìm thấy thư mời',
    }
  }

  return {
    title: `Thân mời ${data.guest_name} đến dự lễ tốt nghiệp của Như Ngọc`,
    description: `Thân mời ${data.guest_name} đến dự buổi lễ tốt nghiệp của Như Ngọc. Sự hiện diện của bạn là niềm vinh hạnh của mình!`,
    openGraph: {
      title: `Thân mời ${data.guest_name} đến dự lễ tốt nghiệp của Như Ngọc`,
      description: `Thân mời ${data.guest_name} đến dự buổi lễ tốt nghiệp của Như Ngọc. Sự hiện diện của bạn là niềm vinh hạnh của mình!`,
      images: ['/image.png'],
    }
  }
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { data } = await supabase
    .from('invitations')
    .select('guest_name')
    .eq('slug', resolvedParams.slug)
    .maybeSingle()

  if (!data) {
    notFound()
  }

  return <InviteCard guestName={data.guest_name} />
}

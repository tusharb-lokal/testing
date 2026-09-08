import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUserProfile, updateUserProfile } from '@/features/user-dashboard/services/user'
import { transformUserProfile } from '@/features/user-dashboard/utils/transform-user'

export function useUserProfile(userId) {
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserProfile(userId),
    select: transformUserProfile,
  })

  const updateMutation = useMutation({
    mutationFn: (updates) => updateUserProfile(userId, updates),
    onSuccess: (data) => {
      queryClient.setQueryData(['users', userId], data)
    },
  })

  async function updateProfile(updates) {
    try {
      await updateMutation.mutateAsync(updates)
      return true
    } catch {
      return false
    }
  }

  return {
    profile: profileQuery.data ?? null,
    loading: profileQuery.isFetching,
    error: profileQuery.error?.message ?? updateMutation.error?.message ?? null,
    saving: updateMutation.isPending,
    refresh: profileQuery.refetch,
    updateProfile,
  }
}

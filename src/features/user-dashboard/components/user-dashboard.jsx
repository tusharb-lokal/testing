import { useState } from 'react'
import { useUserProfile } from '@/features/user-dashboard/hooks/use-user-profile'
import ProfileEditForm from '@/features/user-dashboard/components/profile-edit-form'

const CURRENT_USER_ID = 1

function UserDashboard() {
  const { profile, loading, error, saving, refresh, updateProfile } =
    useUserProfile(CURRENT_USER_ID)
  const [editing, setEditing] = useState(false)

  async function handleSave(updates) {
    const success = await updateProfile(updates)
    if (success) setEditing(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <p className="text-center text-sm text-red-500">{error}</p>
          <button
            type="button"
            onClick={refresh}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Try again
          </button>
        </div>
      ) : loading ? (
        <p className="py-8 text-center text-sm text-slate-400">Loading profile…</p>
      ) : profile ? (
        editing ? (
          <ProfileEditForm
            profile={profile}
            saving={saving}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-900">{profile.fullName}</p>
              {profile.jobTitle && (
                <p className="text-sm text-slate-500">
                  {profile.jobTitle}
                  {profile.company ? ` at ${profile.company}` : ''}
                </p>
              )}
            </div>
            <dl className="flex w-full flex-col gap-1 text-sm">
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <dt className="text-slate-500">Email</dt>
                <dd className="text-slate-900">{profile.email}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <dt className="text-slate-500">Phone</dt>
                <dd className="text-slate-900">{profile.phone}</dd>
              </div>
              {profile.location && (
                <div className="flex justify-between border-b border-slate-100 py-1.5">
                  <dt className="text-slate-500">Location</dt>
                  <dd className="text-slate-900">{profile.location}</dd>
                </div>
              )}
            </dl>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Edit profile
            </button>
          </div>
        )
      ) : null}
    </div>
  )
}

export default UserDashboard

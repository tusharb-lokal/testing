import { useState } from 'react'

function ProfileEditForm({ profile, saving, onSave, onCancel }) {
  const [fullName, setFullName] = useState(profile.fullName)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)

  function handleSubmit(event) {
    event.preventDefault()
    const [firstName, ...rest] = fullName.trim().split(' ')
    onSave({ firstName, lastName: rest.join(' '), email, phone })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm text-slate-600">
        Name
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-600">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-slate-600">
        Phone
        <input
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProfileEditForm

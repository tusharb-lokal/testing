export function transformUserProfile(raw) {
  return {
    id: raw.id,
    fullName: `${raw.firstName} ${raw.lastName}`,
    initials: `${raw.firstName?.[0] ?? ''}${raw.lastName?.[0] ?? ''}`.toUpperCase(),
    email: raw.email,
    phone: raw.phone,
    avatarUrl: raw.image,
    jobTitle: raw.company?.title ?? '',
    company: raw.company?.name ?? '',
    location: [raw.address?.city, raw.address?.state].filter(Boolean).join(', '),
  }
}

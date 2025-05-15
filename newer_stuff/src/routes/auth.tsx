import { createFileRoute, redirect } from '@tanstack/react-router'

type AuthSearch = {
  code: string;
}

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    // validate and parse the search params into a typed state
    return {
      code: (search.code as string) || '',
    }
  },
  beforeLoad: async ({ location, search }) => {
    if (!search.code) {
      throw redirect({
        to: '/',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
    console.log('auth', search.code);
    localStorage.setItem('code', search.code);
    window.dispatchEvent(new Event("store-code"));
    window.close();}
})

function RouteComponent() {
  return <div>Hello "/auth"!</div>
}

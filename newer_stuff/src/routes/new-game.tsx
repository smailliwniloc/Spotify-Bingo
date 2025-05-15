import { createFileRoute } from '@tanstack/react-router'
import Generator from '../generator/Generator'

export const Route = createFileRoute('/new-game')({
  component: RouteComponent
})

function RouteComponent() {

  return <Generator/>
}

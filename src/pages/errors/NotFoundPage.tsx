import { EmptyState } from '../../components/common/EmptyState'
import { AppLayout } from '../../layouts/AppLayout'

export function NotFoundPage() { return <AppLayout><EmptyState title="404 — Page not found" text="The page you are looking for does not exist." action /></AppLayout> }

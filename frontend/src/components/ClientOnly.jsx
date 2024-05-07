import { useIsMounted } from '~/hooks/useIsMounted'

/*
 * Render the children only after the JS has loaded client-side
 * and display an indicator in development mode
 */

export function ClientOnly({ children }) {
  return useIsMounted() ? (
    <>
      {process.env.NODE_ENV === 'development' ? (
        <div className="shadow-[0_0_0_1px_rgba(255,0,0,1)]">{children}</div>
      ) : (
        children
      )}
    </>
  ) : null
}

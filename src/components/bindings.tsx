import { Binding } from "../temial/src"

export const Bindings = ({ bindings, setBinding, binding }: { bindings: Binding[], binding?: Binding, setBinding: (binding: Binding) => void }) => {
  return (
    <>
      {bindings.length === 0 && <div>No machines found</div>}
      {!binding && bindings.length > 1 && (
        <div>
          <div>Change Machine:</div>
          <div>
            {bindings.map(b => (
              <button key={b.bindingId} onClick={() => {
                setBinding(b)
              } }>
                Connect to {b.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
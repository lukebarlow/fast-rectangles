import ExampleIndex from './ExampleIndex'

type Props = {
  pages: string[]
  children?: any
}

export default function ExamplePage({ pages, children }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row'
    }}>
      <ExampleIndex pages={pages} />
      <div>
        {children}
      </div>
    </div>
  )
}
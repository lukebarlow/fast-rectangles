
export default function ExampleIndex({ pages }) {
  return (
    <ul style={{
      width: 200,
      marginRight: 20
    }}>
      {
        pages.map((page, i) => (
          page ?
            <li key={page}><a href={`${page}.html`}>{page}</a></li> :
            <p key={i}></p>
        ))
      }
    </ul>
  )
}
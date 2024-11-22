export default function Stats({ 
  stats: {
    numberOfCharacters,
    instagramCharactersLeft,
    facebookCharactersLeft,
    numberOfWords
  }
}: { 
  stats: {
    numberOfCharacters: number
    instagramCharactersLeft: number
    facebookCharactersLeft: number
    numberOfWords: number
  }
 }) {
  return (
    <section className='stats'>

      <Stat label='Words' number={numberOfWords} />

      <Stat label='Characters' number={numberOfCharacters} />

      <Stat label='Instagram' number={instagramCharactersLeft} />

      <Stat label='Facebook' number={facebookCharactersLeft} />

    </section>
  )
}

function Stat({ label, number }: { label: string, number: number }) {
  return <section className='stat'>
    <span className={`stat__number ${number < 0 ? 'stat__number--limit' : ''}`}>{number}</span>
    <h2 className='second-heading'>{label}</h2>
  </section>
}

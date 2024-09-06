import s from "./Title.module.css"

export const Title = ():JSX.Element => {
  return (
    <h1 className={s.title}>Expand your mind, reading<span className={s.title_span}> a book</span></h1>
  )
}

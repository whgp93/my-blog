export function PullQuote() {
  return (
    <section className="mb-24 flex justify-center">
      <div className="max-w-3xl relative text-center px-4">
        <div className="absolute -start-8 -top-6 w-24 h-24 bg-primary-fixed-dim/30 -z-10 rounded-lg" />
        <blockquote className="font-headline text-2xl md:text-3xl text-on-surface leading-snug">
          &ldquo;لسنا فقط مستهلكين للمعلومات؛ بل نحن معماريو تاريخنا الشخصي. كل رابط حُفظ، وكل صورة احتُفظ بها، هو لبنة في بنيان من كنّا.&rdquo;
        </blockquote>
      </div>
    </section>
  )
}

type CampaignFact = {
  title: string
  body: string
}

type CampaignFactRowProps = {
  label: string
  steps: ReadonlyArray<CampaignFact>
}

function CampaignFactRow({ label, steps }: CampaignFactRowProps) {
  return (
    <div className="border-border flex flex-col gap-4 border-t pt-6">
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {label}
      </p>
      <dl className="text-muted-foreground grid grid-cols-3 gap-4 font-mono text-[0.65rem] tracking-wider uppercase sm:text-xs">
        {steps.map((step) => (
          <div key={step.title} className="flex flex-col gap-1">
            <dt className="text-foreground font-semibold">{step.title}</dt>
            <dd>{step.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export { CampaignFactRow }
export type { CampaignFactRowProps, CampaignFact }

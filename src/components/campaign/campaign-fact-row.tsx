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
    <div className="flex flex-col gap-4 border-t border-foreground/15 pt-6">
      <p className="text-small font-semibold text-muted-foreground">{label}</p>
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="flex flex-col gap-1">
            <dt className="text-small font-semibold text-foreground">
              {step.title}
            </dt>
            <dd className="text-small text-muted-foreground">{step.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export { CampaignFactRow }
export type { CampaignFactRowProps, CampaignFact }

import styles from "./BookingSteps.module.css";

export type BookingStep = "dates" | "review" | "confirmation";

interface BookingStepsProps {
  current: BookingStep;
}

const STEPS: { id: BookingStep; label: string; number: number }[] = [
  { id: "dates", label: "Dates", number: 1 },
  { id: "review", label: "Review", number: 2 },
  { id: "confirmation", label: "Done", number: 3 },
];

function stepIndex(step: BookingStep): number {
  return STEPS.findIndex((entry) => entry.id === step);
}

export function BookingSteps({ current }: BookingStepsProps) {
  const currentIndex = stepIndex(current);

  return (
    <nav className={styles.steps} aria-label="Booking progress">
      {STEPS.map((step, index) => {
        const isActive = step.id === current;
        const isDone = index < currentIndex;

        return (
          <div key={step.id} style={{ display: "contents" }}>
            {index > 0 && <div className={isDone ? styles.dividerDone : styles.divider} />}
            <div className={isActive ? styles.stepActive : isDone ? styles.stepDone : styles.step}>
              <span
                className={
                  isActive
                    ? styles.stepNumberActive
                    : isDone
                      ? styles.stepNumberDone
                      : styles.stepNumber
                }
                aria-hidden="true"
              >
                {isDone ? "✓" : step.number}
              </span>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

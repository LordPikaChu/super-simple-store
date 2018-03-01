import { createSubject } from './subject';

export function createProjector(...selectors) {
  const projector = selectors.pop();
  const subject = createSubject(void 0);
  let isInitializing = true;

  function getSelectorValues() {
    return selectors.map(selector => selector.getValue());
  }

  function getProjectorValue() {
    return projector(...getSelectorValues());
  }

  function updateSubject() {
    if (isInitializing) {
      return;
    }

    subject.next(getProjectorValue());
  }

  selectors.forEach(selector => {
    selector.subscribe(updateSubject);
  });

  isInitializing = false;

  updateSubject();

  return subject;
}

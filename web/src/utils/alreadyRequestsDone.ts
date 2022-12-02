import { IRequestState } from "../redux/reducers/request";

export function alreadyRequestsDone(requests: IRequestState) {
  return !!(
    requests.projects.length > 0 &&
    requests.qualificationList.length > 0 &&
    requests.services.length > 0 &&
    requests.skillsList.length > 0
  );
}

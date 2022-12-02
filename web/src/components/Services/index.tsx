import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRequestState, setRequest } from "../../redux/reducers/request";
import { alreadyRequestsDone } from "../../utils/alreadyRequestsDone";
import { Service } from "./ServiceContainer";

export interface IService {
  title: string;
  serviceList: string[];
}

export function Services() {
  const [cardClicked, setCardClicked] = useState("");
  const [services, setServices] = useState<IService[]>([]);
  const dispatch = useDispatch();
  const isAlreadyRequestsDone = useSelector(
    ({ request }: { request: IRequestState }) => alreadyRequestsDone(request)
  );

  useEffect(() => {
    if (services.length == 0) {
      (
        axios.get(
          `${import.meta.env.VITE_SERVER_URL_API}/services`
        ) as unknown as Promise<{
          data: { ok: boolean; payload: IService[] };
        }>
      ).then((response) => setServices(response.data.payload));
    }
  }, []);

  useEffect(() => {
    dispatch(
      setRequest({
        type: "services",
        data: services,
      })
    );
  }),
    [services];

  return (
    <section
      className={`services section ${
        !isAlreadyRequestsDone && "display__none"
      }`}
      id="services"
    >
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What i offer</span>
      <Service.Root>
        <Service.Default
          handleClick={(title) => setCardClicked(title)}
          cardClicked={cardClicked}
          services={services}
        />
      </Service.Root>
    </section>
  );
}

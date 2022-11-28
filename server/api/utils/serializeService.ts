import { IServiceResponse } from "../models/Service";
import { IService, Section } from "../models/IModel";

export function serializeService(data: IServiceResponse[]): IService[] {
  return data.map((service) => ({
    title: service.properties.title.title[0].text.content,
    serviceList: service.properties.List.relation[0].results.map(
      (item) => item.properties.service.title[0].text.content
    ),
  }));
}

import { EntranceType, EntranceTypeTitles, ICamera, IContact, IEntrance, IHouse, INews, IRequest, IUserApartment, UserRights, UserRightsTitle } from "@interfaces/*";
import { IEntitySettings } from "../shared/interfaces/entity.interface";

export const displayedColumns: { [key: string]: string[] } = {
  requests: ['status', 'title', 'userId', 'create'],
  complexes: ['name', 'address', 'email', 'phones'],
  news: ['timeCreated', 'title', 'desc'],
  entrances: ['type', 'name'],
  cameras: ['name', 'videoUrl'],
  contacts: ['title', 'phone'],
  houses: ['number', 'entranceMin', 'entranceMax', 'apartmentMin', 'apartmentMax'],
  apartments: ['status', 'number', 'entrance', 'houseId', 'name', 'phone'],
  users: ['name', 'rights', 'phone'],
}

export type ParentComplexIdType = ICamera | IContact | IEntrance | IHouse | INews;
export type ParentUserIdType = IRequest | IUserApartment;

export enum Category {
  requests = 'requests',
  complexes = 'complexes',
  news = 'news',
  entrances = 'entrances',
  cameras = 'cameras',
  contacts = 'contacts',
  houses = 'houses',
  apartments = 'apartments',
  users = 'users',
}

export const staticData: IEntitySettings = {
  requests: {
    title: 'Заявки',
    db: '/requests',
    titleColumnName: 'title',
    userInPath: true,
    disableCreate: true,
    columns: [
      {
        name: 'status',
        title: 'Статус',
        type: 'status',
      },
      {
        name: 'create',
        title: 'Створено',
        type: 'datetime',
      },
      {
        name: 'userId',
        title: 'ID користувача',
      },
      {
        name: 'title',
        title: 'Заявка',
      },
      {
        name: 'desc',
        title: 'Опис',
      },
    ]
  },
  complexes: {
    title: 'Комплекси',
    db: '/complex',
    titleColumnName: 'name',
    columns: [
      {
        name: 'name',
        title: 'Назва',
      },
      {
        name: 'address',
        title: 'Адреса',
      },
      {
        name: 'descTitle',
        title: 'Опис, заголовок',
      },
      {
        name: 'desc',
        title: 'Опис',
      },
      {
        name: 'email',
        title: 'Електронна адреса',
      },
      {
        name: 'phones',
        title: 'Телефони',
        placeholder: 'Телефони (через кому)',
      },
      {
        name: 'photos',
        title: 'Фотографії',
      },
      {
        name: 'workingTime',
        title: 'Робочі часи',
      },
    ]
  },
  news: {
    title: 'Новини',
    db: '/news',
    complexInPath: true,
    titleColumnName: 'title',
    columns: [
      {
        name: 'timeCreated',
        title: 'Дата',
        type: 'datetime',
      },
      {
        name: 'complexId',
        title: 'Комплекс',
      },
      {
        name: 'title',
        title: 'Заголовок',
      },
      {
        name: 'desc',
        title: 'Опис',
      },
    ]
  },
  entrances: {
    title: 'Входи',
    db: '/entrance',
    complexInPath: true,
    titleColumnName: 'name',
    columns: [
      {
        name: 'type',
        title: 'Тип',
        transform: (type: EntranceType) => EntranceTypeTitles[type],
      },
      {
        name: 'name',
        title: 'Назва',
      },
    ]
  },
  cameras: {
    title: 'Камери',
    db: '/camera',
    complexInPath: true,
    titleColumnName: 'name',
    columns: [
      {
        name: 'name',
        title: 'Назва',
      },
      {
        name: 'videoUrl',
        title: 'Посилання',
        type: 'link',
      },
    ]
  },
  contacts: {
    title: 'Контакти',
    db: '/contact',
    complexInPath: true,
    titleColumnName: 'title',
    columns: [
      {
        name: 'title',
        title: 'Назва',
      },
      {
        name: 'phone',
        title: 'Телефон',
      },
    ]
  },
  houses: {
    title: 'Дома',
    db: '/house',
    complexInPath: true,
    titleColumnName: 'number',
    columns: [
      {
        name: 'number',
        title: 'Номер дому',
        type: 'number',
      },
      {
        name: 'entranceMin',
        title: 'Парадне, мінімум',
        type: 'number',
      },
      {
        name: 'entranceMax',
        title: 'Парадне, максимум',
        type: 'number',
      },
      {
        name: 'apartmentMin',
        title: 'Квартири, мінімум',
        type: 'number',
      },
      {
        name: 'apartmentMax',
        title: 'Квартири, максимум',
        type: 'number',
      },
    ]
  },
  apartments: {
    title: 'Квартири',
    db: '/user_apartment',
    titleColumnName: 'number',
    userInPath: true,
    disableCreate: true,
    columns: [
      {
        name: 'status',
        title: 'Статус',
        type: 'status',
      },
      {
        name: 'number',
        title: 'Номер квартири',
        type: 'number',
      },
      {
        name: 'entrance',
        title: 'Парадне',
        type: 'number',
      },
      {
        name: 'houseId',
        title: 'Номер дому',
      },
      {
        name: 'name',
        title: 'Ім\'я',
      },
      {
        name: 'phone',
        title: 'Номер телефону',
      },
    ]
  },
  users: {
    title: 'Користувачі',
    db: '/user',
    titleColumnName: 'name',
    disableCreate: true,
    columns: [
      {
        name: 'name',
        title: 'Ім\'я',
      },
      {
        name: 'rights',
        title: 'Права',
        transform: (rights: UserRights): string => UserRightsTitle[rights],
      },
      {
        name: 'phone',
        title: 'Телефон',
      },
    ]
  },
}
import Dexie, { type EntityTable } from "dexie";

export type AudioBook = {
   id: number;
   path: string;
   title?: string;
   authorId?: number[];
   genreId?: number[];
   narratorId?: number[];
   publisherId?: number;
   cover?: string;
} & (
   | {
        seriesId?: number;
        seriesNumber?: number;
     }
   | {
        seriesId?: undefined;
        seriesNumber?: undefined;
     }
);

export type Author = {
   id: number;
   name: string;
};

export type Genre = {
   id: number;
   name: string;
};

export type Narrator = {
   id: number;
   name: string;
};

export type Publisher = {
   id: number;
   name: string;
};

export type Series = {
   id: number;
   name: string;
};

type DB = Dexie & {
   audioBooks: EntityTable<AudioBook, "id">;
   authors: EntityTable<Author, "id">;
   genres: EntityTable<Genre, "id">;
   narrators: EntityTable<Narrator, "id">;
   publishers: EntityTable<Publisher, "id">;
   series: EntityTable<Series, "id">;
};

export const db = new Dexie("abManager") as DB;

db.version(1).stores({
   audioBooks:
      "++id, title, authorId, genreId, narratorId, publisherId, seriesId, seriesNumber",
   authors: "++id, name",
   genres: "++id, name",
   narrators: "++id, name",
   publishers: "++id, name",
   series: "++id, name",
});

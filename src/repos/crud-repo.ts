export interface CrudRepository<T>{
	getAll(): Promise<T[]>;
	getById(id: number): Promise<T>;
	save(newObj: T): Promise<T>;
	update(updateObj: T): Promise<boolean>;
	deleteById(id: number, id2?: number): Promise<boolean>;
	getByUniqueKey(key: string, value: string): Promise<T>;
}
import { CrudRepository } from './crud-repo';
import { Address } from '../models/address';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapAddressResultSet } from '../util/result-set-mapper';
import { InternalServerError } from '../errors/errors';

export class AddressRepository implements CrudRepository<Address>{

	
	async getAll(): Promise<Address[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_event_addresses';
			let rs = await client.query(sql);
			return rs.rows.map(mapAddressResultSet);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	async getById(id: number): Promise<Address>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_event_addresses where address_id = $1';
			let rs = await client.query(sql, [id]);
			return mapAddressResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async getByUniqueKey(key: string, val: string): Promise<Address> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `select * from app_event_addresses where ${key} = $1`;
			let rs = await client.query(sql, [val]);
			return mapAddressResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}		
	}

	async save(newObj: Address): Promise<Address>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_event_addresses(street, city, state, zip) values
			('${newObj.street}', '${newObj.city}', '${newObj.state}', '${newObj.zip}');`;
			await client.query(sql);
			let sql2 = 'SELECT * FROM app_event_addresses WHERE address_id=(SELECT max(address_id) FROM app_event_addresses)';
			let rs = await client.query(sql2);
			return mapAddressResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
	async update(updObj: Address): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 	`update app_event_addresses 
						set street = '${updObj.street}', city = '${updObj.city}', state = '${updObj.state}', zip = '${updObj.zip}'
						where address_id = $1`;
			await client.query(sql, [updObj.address_id]);
			return true;

		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async deleteById(id: number): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'delete from app_event_addresses where address_id = $1';
			await client.query(sql, [id]);
			return true;
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
}

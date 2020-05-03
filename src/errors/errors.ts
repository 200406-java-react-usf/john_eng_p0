class ApplicationError{
	
	statusCode: number;
	message: string;
	reason: string;
	timestamp: Date;

	constructor(statusCode: number, rsn?: string){
		this.statusCode = statusCode;
		this.message = 'An expected error occured.';
		this.timestamp = new Date();
		rsn ? (this.reason = rsn): this.reason = 'Unspecified reason.'; 
	}
	setMessage(message: string){
		this.message = message;
	}
}
class ResourceNotFoundError extends ApplicationError {

	constructor(reason?: string) {
		super(404, reason);
		super.setMessage('No resource found using provided criteria.');
	}
}

class ResourcePersistenceError extends ApplicationError{

	constructor(rsn?: string){
		super(409, rsn);
		super.setMessage('The resource was not persisted.');
	}

}

class BadRequestError extends ApplicationError{

	constructor(rsn?: string){
		super(400, rsn);
		super.setMessage('Invalid parameter provided.');
	}
}

class NotImplementedError extends ApplicationError {

	constructor(reason?: string) {
		super(501, reason);
		super.setMessage('No implementation yet!');
	}

}
class InternalServerError extends ApplicationError {

    constructor(reason?: string) {
        super(500, reason);
        super.setMessage('An unexpected error occurred.');
    }

}

export{
	ResourceNotFoundError,
	ResourcePersistenceError,
	BadRequestError,
	NotImplementedError,
	InternalServerError
};
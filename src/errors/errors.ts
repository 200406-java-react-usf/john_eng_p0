class ApplicationError{
	
	message: string;
	reason: string;

	constructor(rsn?: string){
		this.message = 'An expected error occured.';
		rsn ? (this.reason = rsn): this.reason = 'Unspecified reason.'; 
		
	}
	setMessage(message: string){
		this.message = message;
	}
}
class ResourceNotFoundError extends ApplicationError {

	constructor(reason?: string) {
		super(reason);
		super.setMessage('No resource found using provided criteria.');
	}
    
}

class ResourcePersistenceError extends ApplicationError{

	constructor(rsn?: string){
		super(rsn);
		super.setMessage('The resource was not persisted.');
	}

}

class BadRequestError extends ApplicationError{

	constructor(rsn?: string){
		super(rsn);
		super.setMessage('Invalid parameter provided.');
	}
}

class AuthenticationError extends ApplicationError{

	constructor(rsn?: string){
		super(rsn);
		super.setMessage('Authentication Failed.');
	}
}

class NotImplementedError extends ApplicationError {

	constructor(reason?: string) {
		super(reason);
		super.setMessage('No implementation yet!');
	}

}

export{
	ResourceNotFoundError,
	ResourcePersistenceError,
	BadRequestError,
	AuthenticationError,
	NotImplementedError
};
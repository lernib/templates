import { Handler, APIGatewayEvent } from 'aws-lambda';


type LambdaOutput = string | LambdaGetOutput;
interface LambdaGetOutput {
	foo: number
}

async function get_handler(_event: APIGatewayEvent): Promise<LambdaGetOutput> {
	return {
		foo: 10
	};
}

export const handler: Handler = async (event: APIGatewayEvent) => {
	let body: LambdaOutput;
	let statusCode = '200';
	const headers = {
		'Content-Type': 'application/json'
	};

	switch (event.httpMethod) {
		case 'GET':
			body = await get_handler(event);
			break;
		default:
			body = `Unsupported method "${event.httpMethod}"`;
			statusCode = '400';
	}
	
	body = JSON.stringify(body);

	return {
		statusCode,
		body,
		headers
	}
}

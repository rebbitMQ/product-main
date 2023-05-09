import { ExceptionFilter, Catch, HttpStatus, HttpException, Logger, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorResponseInterface } from './interface';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    private readonly logger = new Logger(ErrorFilter.name);

    catch(exception: any, context: ExecutionContext) {
        // Retrieve the GraphQL query being executed
        const query = GqlExecutionContext.create(context).getInfo().fieldNodes[0].loc.source;

        let response: ErrorResponseInterface;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            // If the exception is an HttpException, update status and message accordingly
            status = exception.getStatus();
            message = exception.message;

            if (status === HttpStatus.BAD_REQUEST) {
                // If the status is BAD_REQUEST, format the error response accordingly
                const validationErrors = exception.getResponse();
                message = 'Validation error';
                response = {
                    statusCode: status,
                    message,
                    errors: validationErrors,
                    timestamp: new Date().toISOString(),
                    query: query.body,
                };

                // Return the response in a format that can be handled by the GraphQL client
                return { data: JSON.parse(JSON.stringify(response)) };
            }

            // Log the error message
            this.logger.error(message, 'Status: ' + status);
        }

        // Format the error response
        response = {
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            query: query.body,
        };

        // Return the response in a format that can be handled by the GraphQL client
        return { data: JSON.parse(JSON.stringify(response)) };
    }
}
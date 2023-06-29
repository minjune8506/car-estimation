export interface CommonResponseType<T> {
	code: number;
	message: string;
	data?: T;
}

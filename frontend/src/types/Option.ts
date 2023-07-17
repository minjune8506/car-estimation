export interface OptionCategory {
	categoryId: number;
	categoryName: string;
}
export interface Option {
	optionId: number;
	optionName: string;
	category: OptionCategory;
}

export interface PropertyData {
	featured_image_url?: string;
	title: {
		rendered: string;
	};
	id: string;
	name?: string;
	imageUrl?: string;
	gender?: string;
	category?: string;
	feature_labels?: Array<string>;
	meal_type_labels?: Array<"1" | "2" | "3">;
	acf: {
		p_kind?: string;
		p_name?: string;
		p_facility?: string;
		p_catch?: string;
		p_menseki?: string;
		p_kozo?: string;
		p_capacity?: string;
		p_no_meal?: boolean;
		p_open?: string;
		p_bus_time?: string;
		p_meal_time?: string;
		p_holiday?: string;
		p_spec_other?: string;
		p_address?: string;
		p_map_code?: string;
		p_track?: string;
		p_primary_station?: string;
		p_transportation?: string;
		p_environments?: string | null;
		p_price_room?: Array<{
			type: string;
			w_1: string;
			w_6: string;
			w_12: string;
			wo_1: string;
			wo_6: string;
			wo_12: string;
		}>;
		p_room_data?: Array<{
			type: string;
			note?: string;
			w_1: number;
			w_6: number;
			w_12: number;
			wo_1: number;
			wo_6: number;
			wo_12: number;
		}>;
		p_fee_deposit?: number;
		p_fee_manage?: number;
		p_fee_1_enter?: number;
		p_fee_2_enter?: number;
		p_fee_3_enter?: number;
		p_fee_4_enter?: number;
		p_other_electric?: string;
		p_other_gas?: string;
		p_other_water?: string;
		p_other_network?: string;
		p_other_meal?: string;
		p_other_etc?: string;
		p_photos?: Array<{
			photo: number;
			caption: string;
		}>;
		p_youtube?: string;
		p_youtube_bottom?: string;
		p_campaign_pdf?: string;
		p_campaign_title?: string;
		p_campaign_price01?: string;
		p_campaign_price02?: string;
		p_campaign_desc?: string;
	};
}

export interface SimulationFormData {
	propertyId: number;
	roomType: string;
	mealPlan: number;
	contractYears: number;
	fullName: string;
	email: string;
	phone: string;
}

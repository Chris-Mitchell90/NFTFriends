export interface UserType {
	eth_address: string;
	nft_groups?: string[];
	userName?: string;
	attending_events: string[];
	_id: string;
	_v: number
}

export interface EventType {
	group: string;
	host?: string;
	date: Date;
	description?: string;
	title?: string;
	venue?: string;
	street?: string;
	postcode?: string;
	city?: string;
	online?: boolean;
	link?: string;
	attendees: string[];
	_id: string;
}

export interface NFT {
	token_address: string;
	token_id: string;
	contract_type: string;
	owner_of: string;
	block_number: string;
	block_number_minted: string;
	token_uri?: string;
	metadata?: string;
	synced_at?: string;
	amount?: string;
	name: string;
	symbol: string;
}

export interface NFTs {
	status?: string | undefined;
	total?: number | undefined;
	page?: number | undefined;
	page_size?: number | undefined;
	result?: NFT[] | undefined;
}

export interface UserAttendingEventUpdate {
	title: string,
	_id: string
}

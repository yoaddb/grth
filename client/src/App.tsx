import React from 'react';
import './App.scss';
import {createApiClient, Ticket} from './api';

export type AppState = {
	tickets?: Ticket[],
	search: string,
	isHovered: boolean[],
	hiddenTickets: any[]
}

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',
		isHovered: [false],
		hiddenTickets: []
		}

	searchDebounce: any = null;

	async componentDidMount() {
		
		this.setState({
			tickets: await api.getTickets(this.state.search)
		});
	}

	handleMouseEnter = (index: number) => {
		const isHoveredClone = [...this.state.isHovered];
		isHoveredClone[index] = true;
		this.setState({isHovered: isHoveredClone})
			
		
	}

	handleMouseLeave = (index:number) => {
		const isHoveredClone = [...this.state.isHovered];
		isHoveredClone[index] = false;
		this.setState({isHovered: isHoveredClone})
			
	}

	handleHideClick= (id:string) => {
		if(this.state.tickets) {
			this.setState({
				tickets: this.state.tickets.filter(ticket => ticket.id !== id),
				hiddenTickets: [...this.state.hiddenTickets, this.state.tickets.find(t => t.id===id)]
			})
		}
	}

	handleRestore = () => {
		if(this.state.tickets) {
			this.setState({
			tickets: [...this.state.tickets, ...this.state.hiddenTickets],
			hiddenTickets: []
			})
		}
	}

	renderTickets = (tickets: Ticket[]) => {

		return (<ul className='tickets'>
			{tickets.map((ticket, index) => (
			<li key={ticket.id} className='ticket' onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={ () => this.handleMouseLeave(index)}>
				<h5 className='title'>{ticket.title}</h5>
				<h5 className='title'>{ticket.content}</h5>
				<footer>
					<div className='meta-data'>By {ticket.userEmail} | { new Date(ticket.creationTime).toLocaleString()}
					<div className='label-wrapper'>
					{ticket.labels && ticket.labels.map(label => {
						return (
							<button className='btn-lbl'>{label}</button>
						)
					})}
					</div>
					</div>
				</footer>
				{this.state.isHovered[index] && <button onClick={() => this.handleHideClick(ticket.id)}>hide</button>}
			</li>
			))}
		</ul>);
	}

	onSearch = async (val: string) => {
		
		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val,
				tickets: this.state.tickets ? [...this.state.tickets] : []
			});
		}, 300);
	}

	render() {	
		const {tickets} = this.state;

		return (<main>
			<h1>Tickets List</h1>
			<header>
				<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)}/>
			</header>
			{tickets ? <div className='results'>Showing {tickets.length} results ({this.state.hiddenTickets.length} hidden tickets) <span onClick={this.handleRestore} style={{color:'blue'}}>restore</span></div> : null }	
			{tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
		</main>)
	}
}

export default App;
import { Component, input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { FlightService } from '../../../services/flight.service';
import { ICard } from '../../../models/card.model';
import { IAirItinerary } from '../../../models/airitineraris.model';
import { initialCard } from '../../../constans/card.initial';
import { DatePipe } from '@angular/common';
import { DurationPipe } from '../../../pipes/duration.pipe';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [RouterModule, DatePipe, DurationPipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css',
})
export class FlightCardComponent implements OnInit {
  constructor(private dataService: DataService) {}
  flight = input.required<IAirItinerary>();
  card: ICard = initialCard;
  ngOnInit(): void {
    this.card = this.dataService.getCardDetails(this.flight());
  }
  onClickFlightDetails() {
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}

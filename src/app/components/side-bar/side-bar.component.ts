import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SideBarComponent implements OnInit {
  flights: any[] = [];
  filteredFlights: any[] = [];
  minPrice = 29223;
  maxPrice = 445349;
  currentPrice = this.minPrice;
  constructor(private flightService: FlightService) {}
  isOpened = false;
  stopLabels = ['Direct', '1 Stop'];
  noResultsMessage: string = '';

  activeFilters: { [key: string]: boolean } = {
    airlines: false,
    price: false,
    stops: false,
    refundable: false,
  };

  showNoResultsMessage(message: string) {
    this.noResultsMessage = message;
    setTimeout(() => {
      this.noResultsMessage = '';
    }, 8000);
  }
  toggleSidebar() {
    this.isOpened = !this.isOpened;
  }

  toggleFilter(filter: string) {
    this.activeFilters[filter] = !this.activeFilters[filter];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.side-bar') && !target.closest('.menu-btn')) {
      this.isOpened = false;
    }
  }

  filterForm = new FormGroup({
    airLines: new FormControl('', [Validators.required]),
    price: new FormControl<number>(this.minPrice),
    stopes: new FormArray([new FormControl(false), new FormControl(false)]),
    refund: new FormControl<
      'both' | 'Refundable Flights' | 'Non Refundable Flights'
    >('both', []),
  });

  allowOnlyEnglish(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(inputElement.value)) {
      inputElement.value = inputElement.value.replace(/[^A-Za-z\s]/g, '');
    }
  }
  ngOnInit() {
    this.flightService.getData().subscribe({
      next: (data) => {
        this.flights = this.flightService.flights();
        this.filteredFlights = [...this.flights];

        this.filterForm.valueChanges.subscribe(() => {
          const airlineValue = this.filterForm.value.airLines || '';
          this.flightService.filterByAirlineName(airlineValue);
          this.filteredFlights = this.flightService.filteredFlights();
        });
        this.filterForm.get('stopes')?.valueChanges.subscribe(() => {
          this.filterByStops();
        });
        this.filterForm.get('refund')?.valueChanges.subscribe(() => {
          this.filterByRefundability();
        });
        this.filterForm.get('price')?.valueChanges.subscribe((value) => {
          console.log('Price range changed to:', value);

          if (typeof value === 'number') {
            this.currentPrice = value;
            this.flightService.filterByPrice(this.currentPrice, this.minPrice);
          }
        });
      },
      error: (error) => {
        console.error('Error loading flights:', error);
      },
    });
  }

  filterByAirline(event: Event) {
    const input = event.target as HTMLInputElement;
    const airline = input.value || '';
    console.log('Airline Input:', airline);
    if (airline) {
      this.flightService.filterByAirlineName(airline);
    }
    if (this.filteredFlights.length === 0) {
      this.showNoResultsMessage('There is no flight');
    } else {
      this.noResultsMessage = '';
    }

    this.filteredFlights = this.flightService.filteredFlights();
  }

  filterByPrice(min: number, max: number) {
    this.flightService.filterByPrice(max, min);
    this.filteredFlights = this.flightService.filteredFlights();
    if (this.filteredFlights.length === 0) {
      this.showNoResultsMessage('There is no flight ');
    } else {
      this.noResultsMessage = '';
    }
  }

  filterByStops() {
    const stops = (this.filterForm.get('stopes') as FormArray).controls
      .map((control, index) => (control.value ? index : null))
      .filter((value) => value !== null) as number[];

    this.flightService.filterByStops(stops);
    this.filteredFlights = this.flightService.filteredFlights();
    if (this.filteredFlights.length === 0) {
      this.showNoResultsMessage('There is no flight');
    } else {
      this.noResultsMessage = '';
    }

    console.log(this.filteredFlights);
  }

  filterByRefundability() {
    const refundability = this.filterForm.value.refund || 'both';

    let refundabilityValue: boolean | 'both';

    switch (refundability) {
      case 'both':
        refundabilityValue = false;
        break;
      case 'Refundable Flights':
        refundabilityValue = true;
        break;
      case 'Non Refundable Flights':
        refundabilityValue = false;
        break;
      default:
        refundabilityValue = false;
        break;
    }

    this.flightService.filterByRefund(refundabilityValue);
    this.filteredFlights = this.flightService.filteredFlights();
    if (this.filteredFlights.length === 0) {
      this.showNoResultsMessage(
        'There are no flights that match your refundability criteria.'
      ); // More specific message
    } else {
      this.noResultsMessage = '';
    }
    console.log(this.filteredFlights);
  }
}

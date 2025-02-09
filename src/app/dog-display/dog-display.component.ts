import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DogService } from './dog-display.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dog-display',
  templateUrl: './dog-display.component.html',
  styleUrls: ['./dog-display.component.css']
})
export class DogDisplayComponent implements AfterViewChecked {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  breeds: any[] = [];
  errorMessage: string = ''; 
  selectedGender: string = 'male';
  searchQuery: string = '';
  filteredBreeds: any[] = [];

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.fetchDogBreeds();
    this.fetchChartsData();
    this.fetchWeightChartData();
    this.fetchChartsDataForFemaleWeights();
  }

  ngAfterViewChecked() {
    this.charts?.toArray().forEach((chart) => {
      if (chart.chart) {
        chart.chart.update();
      }
    });
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
  }

  // Fetch dog breeds from the Dog API
  fetchDogBreeds(): void {
    this.dogService.getDogBreeds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.filteredBreeds = breeds;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load dog breeds.';
        console.error('Error fetching dog breeds', err);
      }
    });
  }


  filterBreeds(): void {
    if (this.searchQuery.trim()) {
      // If search query exists, filter the breeds by name
      this.filteredBreeds = this.breeds.filter(breed => 
        breed.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If no search query, show all breeds
      this.filteredBreeds = [...this.breeds]; // Clone the array to ensure we don't mutate the original array
    }
  }

  // Fetch data for the chart
  fetchChartsData() {
    this.dogService.getDogBreeds().subscribe((breeds) => {
      const breedNames = breeds.map((breed: any) => breed.name);  // Get breed names
      const maxAges = breeds.map((breed: any) => breed.lifeMax);  // Get max ages
      const minAges = breeds.map((breed: any) => breed.lifeMin);  // Get min ages

      const ageDifferences = maxAges.map((max: any, index: any) => max - minAges[index]);  // Calculate the difference between max and min

      // Set chart data
      this.chartData.labels = breedNames;
      this.chartData.datasets = [
        {
          data: minAges,  // Data for min age
          label: 'Min Age (Years)',
          backgroundColor: 'rgba(144, 238, 144, 0.8)',  // Light green color for min age
          borderColor: 'rgba(144, 238, 144, 1)',  // Light green border color
          borderWidth: 1
        },
        {
          data: ageDifferences,  // Data for max age difference (max - min)
          label: 'Max Age (Years)',
          backgroundColor: 'rgba(75, 192, 192, 0.8)',  // Blue color for max age difference
          borderColor: 'rgba(75, 192, 192, 1)',  // Blue border color
          borderWidth: 1
        }
      ];
    });
  }

  public chartData: ChartData<'bar'> = {
    labels: [],  // Will hold dog names (X-axis)
    datasets: [
      {
        data: [],  // Will hold the maximum age values (Y-axis)
        label: 'Max Age (Years)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',  // Border color
        borderWidth: 1
      }
    ]
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dog Breeds'  // X-axis title
        },
        stacked: true  // Enable stacking on the X-axis
      },
      y: {
        title: {
          display: true,
          text: 'Age (Years)'  // Y-axis title
        },
        stacked: true,  // Enable stacking on the Y-axis
        min: 0,   // Set the minimum value of the Y-axis to 0
        max: 30,  // Set the maximum value of the Y-axis to 30
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetIndex = context.datasetIndex;
            const value = context.raw; // Get the value of the hovered bar

            if (datasetIndex === 0) {
              // If hovering over the "Min Age" dataset, show min age
              return `Min Age: ${value} years`;
            } else if (datasetIndex === 1) {
              // If hovering over the "Max Age" dataset, show max age
              const breedIndex = context.dataIndex;  // Get the index of the breed
              const maxAge = this.breeds[breedIndex].lifeMax;  // Get the max age from the breeds data
              return `Max Age: ${maxAge} years`;
            }
            return '';
          }
        }
      }
    },
    animation: {
      duration: 500 // Set a custom animation duration (in milliseconds)
    }
  };

  // Fetch data for the stacked chart displaying min and max weights of male dogs
  fetchWeightChartData() {
    this.dogService.getDogBreeds().subscribe((breeds) => {
      const breedNames = breeds.map((breed: any) => breed.name);  // Get breed names
      const minWeights = breeds.map((breed: any) => breed.maleWeightMin);  // Get min male weights
      const maxWeights = breeds.map((breed: any) => breed.maleWeightMax);  // Get max male weights

      const weightDifferences = maxWeights.map((max: any, index: any) => max - minWeights[index]);  // Calculate the weight difference

      // Set chart data for weights
      this.weightChartData.labels = breedNames;
      this.weightChartData.datasets = [
        {
          data: minWeights,  // Data for min weight
          label: 'Min Weight (kg)',
          backgroundColor: 'rgba(144, 238, 144, 0.8)',  // Light green color for min weight
          borderColor: 'rgba(144, 238, 144, 1)',  // Light green border color
          borderWidth: 1
        },
        {
          data: weightDifferences,  // Data for weight difference (max - min)
          label: 'Max Weight (kg)',
          backgroundColor: 'rgba(75, 192, 192, 0.8)',  // Blue color for max weight difference
          borderColor: 'rgba(75, 192, 192, 1)',  // Blue border color
          borderWidth: 1
        }
      ];
    });
  }

  // Chart data for min and max weights
  public weightChartData: ChartData<'bar'> = {
    labels: [],  // Will hold dog names (X-axis)
    datasets: [    // Initialize with empty data so it can be updated dynamically
      {
        data: [],  // Will hold the minimum weight values (Y-axis)
        label: 'Min Weight (kg)',
        backgroundColor: 'rgba(144, 238, 144, 0.8)',  // Light green color for min weight
        borderColor: 'rgba(144, 238, 144, 1)',  // Light green border color
        borderWidth: 1
      },
      {
        data: [],  // Will hold the max weight differences (Y-axis)
        label: 'Max Weight (kg)',
        backgroundColor: 'rgba(75, 192, 192, 0.8)',  // Blue color for max weight difference
        borderColor: 'rgba(75, 192, 192, 1)',  // Blue border color
        borderWidth: 1
      }
    ]
  };

  // Chart options for the weight chart
  public weightChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dog Breeds'
        },
        stacked: true
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)'
        },
        stacked: true,
        min: 0,
        max: 100,
      }
    },
    animation: {
      duration: 500
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetIndex = context.datasetIndex;
            const value = context.raw;

            if (datasetIndex === 0) {
              return `Min Weight: ${value} kg`;
            } else if (datasetIndex === 1) {
              const breedIndex = context.dataIndex;
              const maxWeight = this.breeds[breedIndex].maleWeightMax;  
              return `Max Weight: ${maxWeight} kg`;
            }
            return '';
          }
        }
      }
    },
  };

  // Fetch data for the chart
  fetchChartsDataForFemaleWeights() {
    this.dogService.getDogBreeds().subscribe((breeds) => {
      const breedNames = breeds.map((breed: any) => breed.name);  // Get breed names
      const maxAges = breeds.map((breed: any) => breed.femaleWeightMax);  // Get max ages
      const minAges = breeds.map((breed: any) => breed.femaleWeightMin);  // Get min ages

      const ageDifferences = maxAges.map((max: any, index: any) => max - minAges[index]);  // Calculate the difference between max and min

      // Set chart data
      this.chartDataForFemaleWeight.labels = breedNames;
      this.chartDataForFemaleWeight.datasets = [
        {
          data: minAges,  // Data for min age
          label: 'Min Age (Years)',
          backgroundColor: 'rgba(144, 238, 144, 0.8)',  // Light green color for min age
          borderColor: 'rgba(144, 238, 144, 1)',  // Light green border color
          borderWidth: 1
        },
        {
          data: ageDifferences,  // Data for max age difference (max - min)
          label: 'Max Age (Years)',
          backgroundColor: 'rgba(75, 192, 192, 0.8)',  // Blue color for max age difference
          borderColor: 'rgba(75, 192, 192, 1)',  // Blue border color
          borderWidth: 1
        }
      ];
    });
  }

  public chartDataForFemaleWeight: ChartData<'bar'> = {
    labels: [],  // Will hold dog names (X-axis)
    datasets: [
      {
        data: [],  // Will hold the maximum age values (Y-axis)
        label: 'Max Age (Years)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',  // Border color
        borderWidth: 1
      }
    ]
  };

  public chartOptionsForFemaleWeight: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dog Breeds'  // X-axis title
        },
        stacked: true  // Enable stacking on the X-axis
      },
      y: {
        title: {
          display: true,
          text: 'Weight (Kg)'  // Y-axis title
        },
        stacked: true,  // Enable stacking on the Y-axis
        min: 0,   // Set the minimum value of the Y-axis to 0
        max: 100,  // Set the maximum value of the Y-axis to 30
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetIndex = context.datasetIndex;
            const value = context.raw;

            if (datasetIndex === 0) {
              return `Min Weight: ${value} kg`;
            } else if (datasetIndex === 1) {
              const breedIndex = context.dataIndex;
              const maxWeight = this.breeds[breedIndex].femaleWeightMax;  
              return `Max Weight: ${maxWeight} kg`;
            }
            return '';
          }
        }
      }
    },
    animation: {
      duration: 500 // Set a custom animation duration (in milliseconds)
    }
  };


}

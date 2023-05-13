import {PollOptionCode} from "./show-results-operations";
import {EChartsOption} from "echarts";
import {Poll, PollOption} from "../../../data/voting";

export class ChartOptionsBuilder {
  private categories: string[] = [];
  private barChartResults: number[] = [];
  private pieChartResults: {}[] = [];
  private colors: any;

  setTheme(colors: any): ChartOptionsBuilder {
    this.colors = colors;
    return this;
  }

  setPollAndResults(poll: Poll, pollResults: Map<PollOptionCode, Number>): ChartOptionsBuilder {
    this.categories = poll.pollOptions.map(o => o.name);
    this.barChartResults = poll.pollOptions.map(o => ChartOptionsBuilder.getResultForOptionOrZero(o, pollResults));
    this.pieChartResults = poll.pollOptions.map(o => {
      return {
        name: o.name,
        value: ChartOptionsBuilder.getResultForOptionOrZero(o, pollResults)
      }
    });

    return this;
  }

  buildBarChartOptions(): EChartsOption {
    return {
      backgroundColor: this.colors.bg,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: this.categories,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: this.colors.fgText,
          },
        },
        axisLabel: {
          color: this.colors.fgText
        },
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLine: {
          lineStyle: {
            color: this.colors.fgText,
          },
        },
        splitLine: {
          lineStyle: {
            color: this.colors.separator,
          },
        },
        axisLabel: {
          color: this.colors.fgText
        },
      },
      series: [
        {
          name: "Vote results",
          data: this.barChartResults,
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)"
          }
        }
      ]
    }
  }

  buildPieChartOptions(): EChartsOption {
    return {
      backgroundColor: this.colors.bg,
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: this.categories,
        textStyle: {
          color: this.colors.fgText
        }
      },
      series: [
        {
          name: "Vote results",
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          data: this.pieChartResults,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },
          label: {
            color: this.colors.fgText
          },
          labelLine: {
            lineStyle: this.colors.fgText
          }
        }
      ]
    }
  }

  private static getResultForOptionOrZero(option: PollOption, pollResults: Map<PollOptionCode, Number>) {
    if (pollResults && pollResults.has(option.code)) {
      return pollResults.get(option.code)!.valueOf();
    } else {
      return 0;
    }
  }
}

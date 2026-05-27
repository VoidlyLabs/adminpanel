export class TimeUtils {
  /**
   * Convert selected amount of hours/minutes/seconds to milliseconds
   * @param hours
   * @param minutes
   * @param seconds
   */
  static toMilliseconds(
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
  ) {
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  }

  /**
   * Convert milliseconds to seconds
   * @param milliseconds
   */
  static toSeconds(milliseconds: number) {
    return milliseconds / 1000;
  }

  /**
   * Convert milliseconds to HMS-object ({ hours, minutes, seconds }
   * @param milliseconds
   */
  static toHMS = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const remainingMilliseconds = Math.round(milliseconds % 1000);

    return { hours, minutes, seconds, milliseconds: remainingMilliseconds };
  };

  /**
   * Convert milliseconds to DHMS-object ({ days, hours, minutes, seconds }
   * @param milliseconds
   */
  static toDHMS = (milliseconds: number) => {
    const initialSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(initialSeconds / (24 * 60 * 60));
    const hours = Math.floor((initialSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((initialSeconds % 3600) / 60);
    const seconds = Math.floor(initialSeconds % 60);

    return { days, hours, minutes, seconds };
  };
}

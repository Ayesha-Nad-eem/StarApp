import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface ZodiacResult {
  sign: string;
  symbol: string;
  dateRange: string;
  birthstone: string;
  birthstoneColor: string;
}

export default function Index() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<ZodiacResult | null>(null);

  const getZodiacSign = (day: number, month: number): ZodiacResult | null => {
    const zodiacData: { [key: string]: ZodiacResult } = {
      aries: { sign: "Aries", symbol: "♈", dateRange: "Mar 21 - Apr 19", birthstone: "Diamond", birthstoneColor: "#B9F2FF" },
      taurus: { sign: "Taurus", symbol: "♉", dateRange: "Apr 20 - May 20", birthstone: "Emerald", birthstoneColor: "#50C878" },
      gemini: { sign: "Gemini", symbol: "♊", dateRange: "May 21 - Jun 20", birthstone: "Pearl", birthstoneColor: "#F0EAD6" },
      cancer: { sign: "Cancer", symbol: "♋", dateRange: "Jun 21 - Jul 22", birthstone: "Ruby", birthstoneColor: "#E0115F" },
      leo: { sign: "Leo", symbol: "♌", dateRange: "Jul 23 - Aug 22", birthstone: "Peridot", birthstoneColor: "#9ACD32" },
      virgo: { sign: "Virgo", symbol: "♍", dateRange: "Aug 23 - Sep 22", birthstone: "Sapphire", birthstoneColor: "#0F52BA" },
      libra: { sign: "Libra", symbol: "♎", dateRange: "Sep 23 - Oct 22", birthstone: "Opal", birthstoneColor: "#A8C3BC" },
      scorpio: { sign: "Scorpio", symbol: "♏", dateRange: "Oct 23 - Nov 21", birthstone: "Topaz", birthstoneColor: "#FFD700" },
      sagittarius: { sign: "Sagittarius", symbol: "♐", dateRange: "Nov 22 - Dec 21", birthstone: "Turquoise", birthstoneColor: "#40E0D0" },
      capricorn: { sign: "Capricorn", symbol: "♑", dateRange: "Dec 22 - Jan 19", birthstone: "Garnet", birthstoneColor: "#8B0000" },
      aquarius: { sign: "Aquarius", symbol: "♒", dateRange: "Jan 20 - Feb 18", birthstone: "Amethyst", birthstoneColor: "#9966CC" },
      pisces: { sign: "Pisces", symbol: "♓", dateRange: "Feb 19 - Mar 20", birthstone: "Aquamarine", birthstoneColor: "#7FFFD4" },
    };

    if (month === 3 && day >= 21 || month === 4 && day <= 19) return zodiacData.aries;
    if (month === 4 && day >= 20 || month === 5 && day <= 20) return zodiacData.taurus;
    if (month === 5 && day >= 21 || month === 6 && day <= 20) return zodiacData.gemini;
    if (month === 6 && day >= 21 || month === 7 && day <= 22) return zodiacData.cancer;
    if (month === 7 && day >= 23 || month === 8 && day <= 22) return zodiacData.leo;
    if (month === 8 && day >= 23 || month === 9 && day <= 22) return zodiacData.virgo;
    if (month === 9 && day >= 23 || month === 10 && day <= 22) return zodiacData.libra;
    if (month === 10 && day >= 23 || month === 11 && day <= 21) return zodiacData.scorpio;
    if (month === 11 && day >= 22 || month === 12 && day <= 21) return zodiacData.sagittarius;
    if (month === 12 && day >= 22 || month === 1 && day <= 19) return zodiacData.capricorn;
    if (month === 1 && day >= 20 || month === 2 && day <= 18) return zodiacData.aquarius;
    if (month === 2 && day >= 19 || month === 3 && day <= 20) return zodiacData.pisces;

    return null;
  };

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getDaysInMonth = (month: number, year: number): number => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month - 1];
  };

  const handleCalculate = () => {
    // Check if all fields are filled
    if (!day || !month || !year) {
      alert("Please fill in all fields (Day, Month, and Year)");
      return;
    }

    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    // Check if inputs are valid numbers
    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      alert("Please enter valid numbers");
      return;
    }

    // Validate year range
    if (y < 1900) {
      alert("Please enter a year after 1900");
      return;
    }

    // Check if date is in the future
    const today = new Date();
    const inputDate = new Date(y, m - 1, d);
    
    if (inputDate > today) {
      alert("You cannot enter a future date! Please enter your actual birth date.");
      return;
    }

    // Validate month
    if (m < 1 || m > 12) {
      alert("Month must be between 1 and 12");
      return;
    }

    // Validate day for the specific month and year
    const maxDays = getDaysInMonth(m, y);
    if (d < 1 || d > maxDays) {
      if (m === 2 && d === 29 && !isLeapYear(y)) {
        alert(`${y} is not a leap year. February only has 28 days in ${y}`);
      } else {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        alert(`Invalid date! ${monthNames[m - 1]} only has ${maxDays} days`);
      }
      return;
    }

    const zodiac = getZodiacSign(d, m);
    if (zodiac) {
      setResult(zodiac);
    }
  };

  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setResult(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.emoji}>✨</Text>
              <Text style={styles.title}>StarApp</Text>
            </View>
            {(day || month || year || result) && (
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleReset}
                activeOpacity={0.7}
              >
                <Text style={styles.resetText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.subtitle}>Discover Your Zodiac & Birthstone</Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputCard}>
          <Text style={styles.inputTitle}>Enter Your Birth Date</Text>
          
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Day</Text>
              <TextInput
                style={styles.input}
                placeholder="DD"
                placeholderTextColor="#6B7280"
                keyboardType="number-pad"
                maxLength={2}
                value={day}
                onChangeText={setDay}
              />
            </View>
            
            <View style={[styles.inputGroup, styles.inputMiddle]}>
              <Text style={styles.label}>Month</Text>
              <TextInput
                style={styles.input}
                placeholder="MM"
                placeholderTextColor="#6B7280"
                keyboardType="number-pad"
                maxLength={2}
                value={month}
                onChangeText={setMonth}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY"
                placeholderTextColor="#6B7280"
                keyboardType="number-pad"
                maxLength={4}
                value={year}
                onChangeText={setYear}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCalculate}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Reveal My Stars ✨</Text>
          </TouchableOpacity>
        </View>

        {/* Result Section */}
        {result && (
          <View style={styles.resultCard}>
            {/* Zodiac Sign */}
            <View style={styles.zodiacSection}>
              <Text style={styles.zodiacSymbol}>{result.symbol}</Text>
              <Text style={styles.zodiacName}>{result.sign}</Text>
              <Text style={styles.dateRange}>{result.dateRange}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Birthstone */}
            <View style={styles.birthstoneSection}>
              <Text style={styles.birthstoneLabel}>YOUR BIRTHSTONE</Text>
              <View 
                style={[styles.birthstoneCircle, { backgroundColor: result.birthstoneColor }]}
              />
              <Text style={styles.birthstoneName}>{result.birthstone}</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        {!result && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Enter your birth date to discover your cosmic identity</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  resetText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  inputCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  inputTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  inputGroup: {
    flex: 1,
  },
  inputMiddle: {
    marginHorizontal: 8,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  button: {
    backgroundColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#581C87',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  zodiacSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  zodiacSymbol: {
    fontSize: 80,
    marginBottom: 16,
  },
  zodiacName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateRange: {
    color: '#D8B4FE',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#7C3AED',
    marginBottom: 32,
  },
  birthstoneSection: {
    alignItems: 'center',
  },
  birthstoneLabel: {
    color: '#D8B4FE',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  birthstoneCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  birthstoneName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});

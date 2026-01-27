from load_data import load_faculty_data

df = load_faculty_data()

print("\nMissing Values per Column:\n")
print(df.isnull().sum())

print("\nPercentage Missing per Column:\n")
print((df.isnull().mean() * 100).round(2))
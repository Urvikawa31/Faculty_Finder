from load_data import load_faculty_data

df = load_faculty_data()

print("\nMissing values per column:")
print(df.isnull().sum())

print("\nDuplicate profile URLs:")
print(df["profile_url"].duplicated().sum())
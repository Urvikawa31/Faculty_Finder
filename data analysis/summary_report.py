from load_data import load_faculty_data

df = load_faculty_data()

print("Total Faculty Records:", len(df))

print("\nFaculty per Category:")
print(df["faculty_category"].value_counts())

print("\nMissing Value Percentage:")
print((df.isnull().mean() * 100).round(2))

df["bio_length"] = df["biography"].fillna("").apply(len)
print("\nBiography Length Stats:")
print("Average:", round(df["bio_length"].mean(), 2))
print("Max:", df["bio_length"].max())
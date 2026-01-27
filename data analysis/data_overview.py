from load_data import load_faculty_data

df = load_faculty_data()

print("Total faculty:", len(df))
print("\nColumns:")
print(df.columns)

print("\nFaculty Category Counts:")
print(df["faculty_category"].value_counts())
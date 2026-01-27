from load_data import load_faculty_data

df = load_faculty_data()

print("\nFaculty Count per Category:\n")
print(df["faculty_category"].value_counts())

print("\nPercentage Distribution:\n")
print((df["faculty_category"].value_counts(normalize=True) * 100).round(2))
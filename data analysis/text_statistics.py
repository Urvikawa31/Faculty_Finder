from load_data import load_faculty_data

df = load_faculty_data()

TEXT_COLUMNS = [
    "biography",
    "specialization",
    "teaching",
    "research",
    "publications"
]

print("\nText Length Statistics:\n")

for col in TEXT_COLUMNS:
    df[col] = df[col].fillna("")
    lengths = df[col].apply(len)

    print(f"\n--- {col.upper()} ---")
    print("Non-empty records:", (lengths > 0).sum())
    print("Average length:", round(lengths.mean(), 2))
    print("Max length:", lengths.max())

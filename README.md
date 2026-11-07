# Library Management System

## Schema Decisions

### Normalized Genre Relation vs. Embedded String/Type
In this schema, `Book` references `Genre` through a separate `genreId` foreign key relation rather than embedding the genre as a plain text string or enum on the book record.

1. **Data Integrity & Consistency:** Normalizing genres into an independent table prevents typo variations (e.g., "Sci-Fi", "Science-Fiction", "Sci Fi") and guarantees consistent categorization across the catalog.
2. **Centralized Lifecycle Management:** Renaming, merging, or updating genre metadata happens in a single row without updating thousands of individual book records.
3. **Query Optimization:** Filtering and indexing on an integer foreign key (`genreId`) provides faster relational lookups and joins compared to indexing arbitrary text fields.
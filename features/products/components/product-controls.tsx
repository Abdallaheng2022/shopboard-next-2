// product-controls.tsx: the search box, and the category and sort selects (the kit's Field,
// Input and Select). Stacked on mobile, one row from md, a sticky sidebar panel from lg.
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ALL_CATEGORIES, isCategoryFilter, isSortOrder } from "../products.logic";
import type { Category, Filters } from "../products.types";

interface ProductControlsProps {
  filters: Filters;
  categories: readonly Category[];
  // Turned off when the store is empty.
  disabled: boolean;
  onChange: (filters: Filters) => void;
}

export function ProductControls({ filters, categories, disabled, onChange }: ProductControlsProps) {
  return (
    <div className="grid gap-x-4 gap-y-3 md:grid-cols-(--filters-columns) lg:sticky lg:top-(--filters-top) lg:grid-cols-1 lg:gap-4 lg:rounded-lg lg:border lg:border-border lg:bg-card lg:p-5 lg:shadow-panel">
      <Field>
        <FieldLabel htmlFor="search">Search</FieldLabel>
        <Input
          id="search"
          type="search"
          placeholder="Product name"
          value={filters.query}
          disabled={disabled}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="category">Category</FieldLabel>
        <Select
          id="category"
          value={filters.category}
          disabled={disabled}
          onChange={(event) => {
            const category = event.target.value;
            if (isCategoryFilter(category)) onChange({ ...filters, category });
          }}
        >
          <option value={ALL_CATEGORIES}>All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="sort">Sort by price</FieldLabel>
        <Select
          id="sort"
          value={filters.sort}
          disabled={disabled}
          onChange={(event) => {
            const sort = event.target.value;
            if (isSortOrder(sort)) onChange({ ...filters, sort });
          }}
        >
          <option value="default">Default</option>
          <option value="price-asc">Low to high</option>
          <option value="price-desc">High to low</option>
        </Select>
      </Field>
    </div>
  );
}

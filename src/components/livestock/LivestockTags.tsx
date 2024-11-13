import React from 'react';
import { Tag as TagIcon } from 'lucide-react';

interface Tag {
  id: string;
  label: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
}

interface LivestockTagsProps {
  tags: Tag[];
  onAddTag?: (tag: Tag) => void;
  onRemoveTag?: (tagId: string) => void;
  editable?: boolean;
}

const LivestockTags = ({ tags, onAddTag, onRemoveTag, editable = false }: LivestockTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
            bg-${tag.color}-100 text-${tag.color}-800`}
        >
          <TagIcon className="h-3 w-3" />
          {tag.label}
          {editable && onRemoveTag && (
            <button
              onClick={() => onRemoveTag(tag.id)}
              className="ml-1 hover:text-red-600"
            >
              ×
            </button>
          )}
        </span>
      ))}
      {editable && onAddTag && (
        <button
          onClick={() => onAddTag({
            id: `tag-${Date.now()}`,
            label: 'New Tag',
            color: 'blue'
          })}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
            bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          + Add Tag
        </button>
      )}
    </div>
  );
};

export default LivestockTags;
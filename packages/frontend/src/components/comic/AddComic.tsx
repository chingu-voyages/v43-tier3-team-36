import React, { useCallback } from 'react';
import TComicItem from '@/types/comic';
import { AlertDialog, Button } from '../ui';
import ComicCard from '@/components/common/ComicCard';
import { createImageUrl } from '@/utils';

export const AddComic = ({
  comic,
  show,
  onAdd,
  onClose,
}: {
  comic: TComicItem;
  show: boolean;
  onAdd: () => void;
  onClose: () => void;
}) => {
  const AddButton = useCallback(() => {
    const handleAdd = () => {
      onAdd();
    };

    return <Button onClick={handleAdd}>Add</Button>;
  }, [onAdd]);

  const CancelButton = useCallback(() => {
    const handleCancel = () => {
      onClose();
    };

    return (
      <Button variant="outlined" className="mr-2" onClick={handleCancel}>
        Cancel
      </Button>
    );
  }, [onClose]);

  return (
    <AlertDialog
      title="Add comic"
      description="Add this comic to your collection"
      open={show}
      actions={[AddButton, CancelButton]}
      onClose={onClose}
    >
      <div className="flex justify-center">
        <ComicCard
          comic={{
            title: comic.title,
            issueNo: comic.issueNumber,
            imageUrl: createImageUrl(comic.images),
          }}
          large
        />
      </div>
    </AlertDialog>
  );
};

export default AddComic;
